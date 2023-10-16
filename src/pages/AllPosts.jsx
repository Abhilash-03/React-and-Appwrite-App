import { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/configuration'

function AllPosts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      appwriteService.getPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents);
        }
      })
      .catch((err) => console.log(err));

    }, [])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {
                posts.map((post) => (
                    <div key={post.$id} className='py-2 w-1/4'>
                       <PostCard {...post} />
                    </div>
                ))
            }
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
