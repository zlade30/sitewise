import { Nav } from '@/components/shared';
import { Footer } from '@/components/shared/footers';
import { Header } from '@/components/shared/headers';
import { PhotosUploadContainer } from '@/components/features/photos';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen flex items-start">
            <Nav />
            <PhotosUploadContainer />
            <div className="w-full h-full flex flex-col items-start justify-between">
                <Header />
                <main className="w-full h-full overflow-y-auto flex-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
