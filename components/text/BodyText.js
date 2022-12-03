import Motion from "../Motion"

const BodyText = ({ data }) => {
  return (
    <Motion>
      <p className="leading-normal px-4">
        {data.body_text}
      </p>
    </Motion>
  )
}

export default BodyText
