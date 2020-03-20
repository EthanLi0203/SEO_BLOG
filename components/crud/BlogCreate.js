import Link from 'next/link'
import {useEffect, useState} from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories} from '../../actions/category'
import {getTags} from '../../actions/tag'
import {createBlog} from '../../actions/createBlog'
import '../../node_modules/react-quill/dist/quill.snow.css'
import { identity } from 'lodash'
import {QuillModules, QuillFormats} from '../../helpers/quill'

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const CreateBlog = ({router}) => {

    const blogFormLS = () => {
        if(typeof window === 'undefined'){
            return false;
        }
        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        }else{
            return false;
        }
    }
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkedTags, setCheckedTags] = useState([]);
    const [tags, setTags] = useState([])
    const [body, setBody] = useState(blogFormLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title:'',
        hidePublishButton: false,
    });

    const {error, sizeError, success, formData, title, hidePublishButton} = values;
    const token = getCookie('token')

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setTags(data);
            }
        })
    }

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initCategories();
        initTags();
    }, [router])

    const publishBlog = e => {
        e.preventDefault();
        createBlog(formData, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, title:'', error:'', success: `A new blog titled ${data.title} is created`})
                setBody('');
                // setCategories([]);
                // setTags([])
            }
        })
    }

    const handleChange = name => e => {
        const value = name === 'photo'? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value,formData, error:''})
    }

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        if(typeof window !== 'undefined'){
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const showCategories = () => {
        return(       
            categories && categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-1"/>
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    const handleToggle = c => () => {
        setValues({...values, error:''})
        
        const clicked = checked.indexOf(c)
        const all = [...checked];
        if(clicked === -1){
            all.push(c);
        }else{
            all.splice(clicked, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all)
    }

    const handleTagToggle = t => () => {
        setValues({...values, error:''})
        
        const clicked = checkedTags.indexOf(t)
        const all = [...checkedTags];
        if(clicked === -1){
            all.push(t);
        }else{
            all.splice(clicked, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('tags', all)
    }


    const showTags = () => {
        return(
            tags && tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagToggle(t._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const showError = () => {
       if(error) 
       return <div className="alert alert-danger" >{error}</div>
    }

    const showSuccess = () => {
        return <div className="alert alert-success" style={{display: success? '' : 'none'}}>{success}</div>
    }

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
                </div>
    
                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats}  value={body} placeholder="Let's write something..." onChange={handleBody}/>
                </div>
    
                <div>
                    <button type="submit" className="btn btn-primary btn-lg disabled">Publish</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid pb-5">
            <div className="row pt-3 pl-2">
                <div className="col-md-9">
                    {createBlogForm()} 
                    <div className="pt-2">
                        {showError()}
                        {showSuccess()}
                    </div>    
                    <hr/>
                    {JSON.stringify(values)}                
                </div>
                <div className="col-md-3">
                    <div className="form-group pb-2">
                        <h5>Featured image</h5>
                        <hr/>
                        <label className="btn btn-primary btn-lg btn-sm disabled">
                              Upload photo
                             <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/>
                         </label>
                         <br/>
                        <small className="text-muted">Max size: 2Mb</small>                        
                    </div>
                    
                    <div>
                        <h5>Categories</h5>
                        <hr/>
                        <ul style={{maxHeight:'150px', overflow:'scroll'}}>{showCategories()}</ul>
                    </div> 
                    <div>
                        <h5>Tags</h5>
                        <hr/>
                        <ul style={{maxHeight:'150px', overflow:'scroll'}}>{showTags()}</ul>
                    </div>        
                </div>
            </div>
        </div>
        
    )

}


export default withRouter(CreateBlog);