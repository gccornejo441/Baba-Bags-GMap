import { useRouter } from 'next/router'
import useSwr from 'swr'


const Post = () => {
  const router = useRouter()
  const { giftwrapid } = router.query

  return <p>Giftwrapid: {giftwrapid}</p>
}

export default Post