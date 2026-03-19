import { useState } from "react";

export const useTabs = (params: { tab?: string }) => {
    const [tab, setTab] = useState<string>(params.tab ?? '');

    const handleTabChange = (event: React.MouseEvent<HTMLButtonElement> | null, newTab: string) => {
        setTab(newTab);
    };

    return {
        tab,
        handleTabChange
    };
};