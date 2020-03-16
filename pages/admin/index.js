import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'

import Link from 'next/link'

const AdminIndex = () => { 
    return (
        <Layout>
            <Admin>           
                 <div>Admin Dashboard</div>
            </Admin>
        </Layout>
    )
}

export default AdminIndex;