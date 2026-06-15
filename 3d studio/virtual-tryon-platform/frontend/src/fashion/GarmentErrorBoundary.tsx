import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode; modelPath: string };
type State = { failed: boolean };

/** Reset when user picks another product. */
export class GarmentErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidUpdate(prev: Props) {
    if (prev.modelPath !== this.props.modelPath && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Garment load failed:", this.props.modelPath, error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <mesh>
          <boxGeometry args={[0.35, 0.5, 0.12]} />
          <meshStandardMaterial color="#b45309" wireframe />
        </mesh>
      );
    }
    return this.props.children;
  }
}
