import ProjectWorkbook from '@/components/ProjectWorkbook';
import AppTabs from '@/components/AppTabs';
import { PROJECT_TITLE, PROJECT_SCENARIO, CHECKLIST, CALC_TASKS } from '@/data/pptProject';

export const metadata = { title: '実践演習 | Office Master' };

const TABS = [
  { href: '/powerpoint/practice', label: '練習問題' },
  { href: '/powerpoint/project', label: '実践演習' },
  { href: '/powerpoint/learn', label: '学習タブ' },
];

export default function PptProjectPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-steel-800 mb-1">PowerPoint</h1>
      <AppTabs links={TABS} />
      <ProjectWorkbook
        title={PROJECT_TITLE}
        scenario={PROJECT_SCENARIO}
        checklist={CHECKLIST}
        calcTasks={CALC_TASKS}
        appLabel="PowerPoint"
      />
    </div>
  );
}
