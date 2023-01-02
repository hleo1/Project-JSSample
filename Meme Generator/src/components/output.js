import PropTypes from "prop-types";

function Output(props) {
  // take the top/bottom text and imageURLs that was passed into
  const topText = props.information.topText;
  const bottomText = props.information.bottomText;
  const imageURL = props.information.imageURL;
  return (
    // simply insert the top/bottom texts and imageurls into the relevant positions
    <section className="section is-medium pt-0 pb-6 has-text-centered">
      <article className="message is-medium">
        <div className="message-body" id="output">
          <div className="meme">
            <img id="img" width="800rem" height="auto" src={imageURL} alt="" />
            <h2 id="top-text" className="top">
              {topText}
            </h2>
            <h2 id="bottom-text" className="bottom">
              {bottomText}
            </h2>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Output;

Output.propTypes = {
  information: PropTypes.shape({
    topText: PropTypes.string.isRequired,
    bottomText: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
  }),
};
