
import { RendererComponent } from './Renderer';
import type { ControlProps, ControlState } from '#jSchemaBuilder/core';

/**
 * A controlled component convenience wrapper that additionally manages a focused state.
 *
 * @template P control specific properties
 * @template S the state managed by the control
 */
export class Control<
  P extends ControlProps,
  S extends ControlState
> extends RendererComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      value: props.data ? props.data : '',
      isFocused: false,
    } as S;
  }

  /**
   * Propagates a value change.
   *
   * @param value the updated value
   */
  handleChange = (value: any) => {
    this.setState({ value });
    this.updateData(value);
  };

  /**
   * Set the focused state to true.
   */
  onFocus = () => {
    this.setState({ isFocused: true });
  };

  /**
   * Set the focused state to false.
   */
  onBlur = () => {
    this.setState({ isFocused: false });
  };

  private updateData = (value: any) => {
    this.props.handleChange(this.props.path, value);
  };
}
