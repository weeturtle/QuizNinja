type propType < T > = Promise<
  {props: T} 
  |
  {redirect: {
    destination: string,
    permanent: boolean}}
>

export default propType;