import { Button } from "@mui/material";

export function TableTabs({
    handleTabChange,
    activeTab,
    tabs
}: {
    handleTabChange: (newTab: string) => void,
    activeTab: string,
    tabs: { label: string, value: string }[]
}) {
    return (
        <div className='flex flex-row gap-2 w-full shrink-0 h-14'>
            {tabs.map((tab) => (
                <Button
                    variant='contained'
                    className={`hover:!bg-orange-100 hover:!text-orange-600 !border-2 hover:!border-orange-500 ${activeTab === tab.value ? '!bg-orange-100 !text-orange-600 !border-orange-500' : '!bg-gray-100 !text-gray-700 !border-gray-500'}`}
                    disableElevation
                    fullWidth
                    onClick={() => handleTabChange(tab.value)}
                    key={tab.value}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
};