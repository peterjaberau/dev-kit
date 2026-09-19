import React from 'react';

interface PanelErrorBoundaryProps {
  panelName: string;
  panelId: string;
  onReset: () => void;
  children: React.ReactNode;
}

interface PanelErrorBoundaryState {
  error: Error | null;
}

function PanelErrorFallback(props: {
  panelName: string;
  panelId: string;
  error: Error;
  onReset: () => void;
}): React.ReactNode {
  const { panelName, panelId, error, onReset } = props;
  return (
    <div className="bg-background text-foreground flex h-full w-full items-center justify-center p-4">
      <div className="border-destructive/40 bg-destructive/5 w-full max-w-md space-y-2 rounded-md border p-3">
        <div className="text-sm font-semibold">{panelName}</div>
        <div className="text-muted-foreground break-all text-xs">{"Panel Id" + panelId}</div>
        <div className="text-muted-foreground text-xs">
          {"Unknown error occurred. Please reset the panel or reload the page." + error.message}
        </div>
        <button
          type="button"
          className="border-input bg-background hover:bg-accent rounded border px-2 py-1 text-xs"
          onClick={onReset}
        >
          {"Reset Panel"}
        </button>
      </div>
    </div>
  )
}

export class PanelErrorBoundary extends React.Component<PanelErrorBoundaryProps, PanelErrorBoundaryState> {
  public constructor(props: PanelErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  public static getDerivedStateFromError(error: Error): PanelErrorBoundaryState {
    return { error };
  }

  public componentDidCatch(error: Error): void {
    console.error(`Panel crashed: ${this.props.panelName} (${this.props.panelId})`, error);
  }

  private handleReset = (): void => {
    this.setState({ error: null });
    this.props.onReset();
  };

  public render(): React.ReactNode {
    const { error } = this.state;
    if (!error) {
      return this.props.children;
    }
    return (
      <PanelErrorFallback
        panelName={this.props.panelName}
        panelId={this.props.panelId}
        error={error}
        onReset={this.handleReset}
      />
    );
  }
}
