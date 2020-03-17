import {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import {Create, Get, SingleCategory, Remove} from '../../actions/category'

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })

    const {name, error, success, categories, removed, reload} = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories()
    }, [reload])

    const loadCategories =() => {
        Get().then(data => {
            if(data.error) console.log(data.error);
            else{
                setValues({...values, categories: data})
            }
        })
    }

    const showCategories = () => {
        return categories.map((c, i) => {
            return <button onDoubleClick={() => deleteConfirm(c.slug)} title="Double click to remove category" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">{c.name}</button>
        })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm(`Are you sure to delete this category?`)
        if(answer){
            deleteCategory(slug);
        }
    }

    const deleteCategory = slug => {
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

    const newCategoryForm = () => (
        <form onSubmit={clickSumbit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required></input>
            </div>
            <div>
                <button type="submit" className="btn btn-info">Create Category</button>
            </div>
        </form>
    )

    return <React.Fragment>
    {showSuccess()}{showError()}{showRemoved()}
        
        <div onMouseMove={mouseMoveHandler}>{newCategoryForm()}{showCategories()}</div>
    </React.Fragment>
}

export default Category;