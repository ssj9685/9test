export function fetcher(props: {
  type: "axios" | "ky" | "fetch"; //...etc
}) {
  switch (props.type) {
    case "axios":
      break;
    case "ky":
      break;
    case "fetch":
      break;
    default:
  }
}
