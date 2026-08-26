"use client";

import { useEffect, useState } from "react";
import { IDEShell } from "@/components/shell/IDEShell";
import { MachineProvider } from "@/lib/machineContext";

export function ClientShell() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-screen w-screen bg-yard-bg" />;
    }

    return (
        <MachineProvider>
            <IDEShell />
        </MachineProvider>
    );
}
