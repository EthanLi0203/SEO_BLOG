import {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import {Create, Get, SingleTag, Remove} from '../../actions/tag'

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    })

    const {name, error, success, tags, removed, reload} = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags()
    }, [reload])

    const loadTags =() => {
        Get().then(data => {
            if(data.error) console.log(data.error);
            else{
                setValues({...values, tags: data})
            }
        })
    }

    const showTags = () => {
        return tags.map((t, i) => {
            return <button onDoubleClick={() => deleteConfirm(t.slug)} title="Double click to remove tag" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</button>
        })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm(`Are you sure to delete this tag?`)
        if(answer){
            deleteTag(slug);
        }
    }

    const deleteTag = slug => {
        console.log("delete")
        Remove(slug, token).then(data => {
            if(data.error) console.log(data.error);
            else{
                setValues({...values, error:false, success:false, name:'', removed: !removed, reload: !reload})
            }
        })
    }

    const clickSumbit = e => {
        e.preventDefault();
        Create({name}, token).then(data => {
            if(data.error){
                setValues({...values, error:data.error, success: false})
            }else{
                setValues({...values, error:false, success: true, name:'', reload: !reload})
            }
        })
    }

    const handleChange = e => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''})
    }

    const showSuccess = () => {
        if(success){
            return <p className="text-success">Category has been created</p>
        }
    }
    const showError = () => {
        if(error){
            return <p className="text-danger">Category has already existed</p>
        }
    }
    const showRemoved= () => {
        if(removed){
            return <p className="text-warning">Category has been deleted</p>
        }
    }

    const mouseMoveHandler = e => {
        setValues({...values, error:false, success: false, removed: ''})
    }

    const newTagForm = () => (
        <form onSubmit={clickSumbit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required></input>
            </div>
            <div>
                <button type="submit" className="btn btn-info">Create Tag</button>
            </div>
        </form>
    )

    return <React.Fragment>
    {showSuccess()}{showError()}{showRemoved()}
        
        <div onMouseMove={mouseMoveHandler}>{newTagForm()}{showTags()}</div>
    </React.Fragment>
}

export default Tag;