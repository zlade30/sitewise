import { Nav } from '@/components/shared';
import { Header } from '@/components/shared/headers';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen flex items-start">
            <Nav />
            <div className="w-full h-full flex flex-col items-start justify-between">
                <Header />
                <main className="w-full h-full overflow-y-auto flex-1">{children}</main>
                <footer>Footer</footer>
            </div>
        </div>
    );
}
