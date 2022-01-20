import { useEffect, useState } from 'react'
import LinkForm from './LinkForm';
import { db } from '../firebase'
import { toast } from 'react-toastify'

const Links = () => {

    const [links, setLinks] = useState([])
    const [currentId, setCurentId] = useState('')


    const addOrEdit = async (linkObj) => {
        try {
            if (currentId === '') {
                await db
                    .collection('links')//crea una collection llamada links
                    .doc()//genera un documento nuevo con un id unico
                    .set(linkObj)//datos que se guardaran en el documento

                toast('New Link Added', {
                    type: 'success'
                })
            } else {
                await db.collection('links').doc(currentId).update(linkObj)
                toast(' Link Updated successfully', {
                    type: 'info'
                })
                setCurentId('')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onDeleteLink = async (id) => {
        if (window.confirm('Are your sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete()
            toast('Link Remove successfully', {
                type: 'error',
                autoClose: 2000,
            })
        }
    }

    const getLink = async () => {
        // const querySnapshot = await db.collection('links').get()
        //onSnapshot ==> fn que se ejecuta cada vez que los datos cambien
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setLinks(docs)
        })
    }

    useEffect(() => {
        getLink()
    }, [])

    return (
        <div>
            <div className="col-md-4 p-2">
                <LinkForm {...{ addOrEdit, currentId, links }} />
            </div>
            <div className="col-md-8 p-2">
                {links.map(link => (
                    <div key={link.id} className="card mb-1">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>
                                    {link.name}
                                </h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={() => setCurentId(link.id)}>create</i>

                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">Got to Website</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Links
