const IconFA = ({
  icon,
  className = "",
  title = "",
  hovColor = "",
  onClick,
}: {
  icon: string
  className?: string
  title?: string
  hovColor?: string
  onClick?: () => void
}) => {
  return (
    <>
      <i className={`${icon} ${className}`} title={title} onClick={onClick} />
      <style jsx>
        {`
          i:hover {
            color: ${hovColor};
          }
        `}
      </style>
    </>
  )
}

export default IconFA
