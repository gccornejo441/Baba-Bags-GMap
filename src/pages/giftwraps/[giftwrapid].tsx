
import useSwr from 'swr'
import { Inputs } from '@/types'


const fetcher = (url: string) => fetch(url).then((res) => res.json())


const Post = () => {
  const { data, error } = useSwr<Inputs>('/api/gitwraps', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return <p>Giftwrapid: {data.giftwrap_id}</p>
}

export default Post