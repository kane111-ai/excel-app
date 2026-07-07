import ProjectWorkbook from '@/components/ProjectWorkbook';
import AppTabs from '@/components/AppTabs';
import { PROJECT_TITLE, PROJECT_SCENARIO, CHECKLIST, CALC_TASKS } from '@/data/wordProject';

export const metadata = { title: '実践演習 | Office Master' };

const TABS = [
  { href: '/word/practice', label: '練習問題' },
  { href: '/word/project', label: '実践演習' },
  { href: '/word/learn', label: '学習タブ' },
];

export default function WordProjectPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">Word</h1>
      <AppTabs links={TABS} />
      <ProjectWorkbook
        title={PROJECT_TITLE}
        scenario={PROJECT_SCENARIO}
        checklist={CHECKLIST}
        calcTasks={CALC_TASKS}
        appLabel="Word"
      />
    </div>
  );
}
