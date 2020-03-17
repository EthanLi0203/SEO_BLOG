import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'

import Link from 'next/link'

const AdminIndex = () => { 
    return (
        <Layout>
            <Admin>           
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-3"><h2>Admin Dashboard</h2></div>
                            <div className="col-md-4">
                                <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create category</a>
                                    </Link>
                                </li>
                               
                                </ul>
                            </div>
                        <div className="col-md-8">right</div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default AdminIndex;