import Bubble from '@/components/shared/Bubble';
import { usePhotos } from '@/swrApi/photos';
import { PHOTO_DETAILS_PAGE_SLUG } from '@/utils/constants';
import { useParams } from 'next/navigation';

const PhotosTags = () => {
    const { photos } = usePhotos();
    const { slug = [] } = useParams();
    const photoId = slug[PHOTO_DETAILS_PAGE_SLUG];
    const photoDetails = photos.find((item) => item.id === photoId);

    return (
        photoDetails && (
            <>
                <p className="p-[10px]">Basic Tags</p>
                <div className="w-full cursor-pointer flex flex-wrap px-[10px] gap-[10px] text-[14px]">
                    {photoDetails.basicTags.map((item) => (
                        <Bubble key={item} value={item} />
                    ))}
                </div>
                <p className="p-[10px]">Custom Tags</p>
                <div className="w-full cursor-pointer flex flex-wrap px-[10px] pb-[10px] gap-[10px] text-[14px]">
                    <Bubble isAdd value="New Tag" />
                    {photoDetails.customTags.map((item) => (
                        <Bubble key={item} value={item} />
                    ))}
                </div>
            </>
        )
    );
};

export default PhotosTags;
