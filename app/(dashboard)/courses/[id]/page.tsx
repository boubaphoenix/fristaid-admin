import Link from 'next/link';

import { CourseHeaderEditor } from '@/components/CourseHeaderEditor';
import { LessonStepEditor } from '@/components/LessonStepEditor';
import { VerifyBenchmarkButton } from '@/components/VerifyBenchmarkButton';
import { adminFetch } from '@/lib/backendFetch';

type LessonStep = {
  id: string;
  title: string;
  description: string;
  memory_phrase: string | null;
  warning_text: string | null;
  image_key: string;
  image_alt: string;
};

type Lesson = { id: string; title: string; lesson_steps: LessonStep[] };

type CourseDetail = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration_minutes: number;
  level: string;
  is_published: boolean;
  last_benchmark_verified_at: string | null;
  lessons: Lesson[];
};

type EditHistoryEntry = {
  id: string;
  action_type: string;
  target_type: string | null;
  reason: string;
  actor_email: string;
  created_at: string;
};

// Éditeur structuré par étape (voir plan §3) — jamais d'accès SQL direct.
// Chaque sauvegarde (en-tête ou étape) exige un motif, journalisé et
// affiché ci-dessous (traçabilité pour les échanges Croix-Rouge CI /
// Ministère de la Santé).
export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await adminFetch<CourseDetail>(`/admin/courses/${id}`);
  const { history } = await adminFetch<{ history: EditHistoryEntry[] }>(`/admin/courses/${id}/edit-history`);

  return (
    <div>
      <Link href="/courses" style={{ fontSize: 13, color: 'var(--color-trust-blue)' }}>
        ← Tous les cours
      </Link>
      <h1 style={{ marginTop: 8 }}>{course.title}</h1>

      <VerifyBenchmarkButton courseId={course.id} lastVerifiedAt={course.last_benchmark_verified_at} />

      <CourseHeaderEditor
        courseId={course.id}
        initial={{
          title: course.title,
          description: course.description,
          category: course.category,
          duration_minutes: course.duration_minutes,
          level: course.level,
          is_published: course.is_published,
        }}
      />

      {course.lessons.map((lesson) => (
        <div key={lesson.id} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16 }}>{lesson.title}</h2>
          {lesson.lesson_steps.map((step, index) => (
            <LessonStepEditor
              key={step.id}
              courseId={course.id}
              lessonId={lesson.id}
              stepId={step.id}
              stepIndex={index}
              initial={{
                title: step.title,
                description: step.description,
                memory_phrase: step.memory_phrase,
                warning_text: step.warning_text,
                image_key: step.image_key,
                image_alt: step.image_alt,
              }}
            />
          ))}
        </div>
      ))}

      <h2 style={{ fontSize: 16 }}>Historique des modifications</h2>
      {history.length === 0 ? (
        <p style={{ color: 'var(--color-muted-text)', fontSize: 14 }}>Aucune modification enregistrée pour ce cours.</p>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden' }}>
          {history.map((entry) => (
            <div key={entry.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <strong>{entry.action_type}</strong>
                <span style={{ color: 'var(--color-muted-text)' }}>
                  {entry.actor_email} · {new Date(entry.created_at).toLocaleString('fr-FR')}
                </span>
              </div>
              <span>{entry.reason}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
