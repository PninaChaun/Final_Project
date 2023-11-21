import FadeLoader from "react-spinners/FadeLoader";

export const Loading = () => {

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#19acb7",
  };

  return <>
    <FadeLoader
      color='#19acb7'
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </>
}