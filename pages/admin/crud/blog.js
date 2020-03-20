import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'

const Blog = () => { 
    return (
        <Layout>
            <Admin>           
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-3">
                            <h2>Writing a new blog</h2>
                        </div>
                        <div className="col-md-9">
                            <BlogCreate/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog;