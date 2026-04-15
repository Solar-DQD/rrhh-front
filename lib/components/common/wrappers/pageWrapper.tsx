export default function PageWrapper({ title, subtitle, titlePos = 'top', children }: { title: string, subtitle?: string, titlePos?: 'top' | 'mid', children?: React.ReactNode }) {
    const titleEl = (
        <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800'>
            {title}
        </p>
    );
    const subTitleEl = (
        <p className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800'>
            {subtitle}
        </p>
    );

    if (titlePos === 'mid') {
        return (
            <div className='flex flex-col gap-10 sm:gap-12 items-center justify-center w-full h-full'>
                {titleEl}
                {subtitle ? subTitleEl : null}
                {children}
            </div>
        );
    };
    
    return (
        <div className='flex flex-col gap-2 sm:gap-3 w-full h-full overflow-hidden'>
            <div className='flex flex-col gap-6 items-center justify-center min-h-[60px] shrink-0'>
                {titleEl}
                {subtitle ? subTitleEl : null}
            </div>
            <div className='flex items-center justify-center flex-1 min-h-0 overflow-hidden'>
                {children}
            </div>
        </div>
    );
};