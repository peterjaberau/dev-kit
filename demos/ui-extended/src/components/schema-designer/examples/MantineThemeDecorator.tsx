import { MantineProvider } from '@mantine/core';

export function MantineThemeDecorator({ children }: any) {
    return (
        <MantineProvider>
            <div className="rje-form">
              { children }
            </div>
        </MantineProvider>
    );
}
