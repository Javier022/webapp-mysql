import { create } from "react-test-renderer";
import App from "App";

describe("<App />", () => {
  let component;
  let provider;

  beforeAll(() => {
    component = create(<App />);
    provider = component.root.type("DataProvider");
  });

  it("render correctly", () => {
    expect(component).toBeDefined();
  });

  it("has provider", () => {
    expect(provider).toBeDefined();
  });

  it("contains routes and toast", () => {
    const routes = provider.props.children[0].type;
    const toastContainer = provider.props.children[1].type;

    expect(routes).toBeDefined();
    expect(toastContainer).toBeDefined();
  });
});
