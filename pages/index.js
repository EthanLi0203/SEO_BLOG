import Layout from '../components/Layout'
import Link from 'next/link'

const Index = () => { 
    return (
        <Layout>
            <div>Home page</div>
            <Link href="/signin"><a>Signin</a></Link>
            <Link href="/signup"><a>Signup</a></Link>

        </Layout>
    )
}

export default Index;