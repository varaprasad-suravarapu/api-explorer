interface TitleProps {
  title: string;
  titleStyle?: string
}

const Title = ({titleStyle=" ", title}: TitleProps) => {
  return <div className={`text-sm font-medium text-green-600 uppercase ${titleStyle}`}>{title}</div>
}

export default Title
