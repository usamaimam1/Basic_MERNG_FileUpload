import React from 'react'
import { useMutation, gql } from '@apollo/client'

const UPLOAD_MUTATION = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file:$file){
            url
        }
    }
`

export default function UploadForm() {
    const [uploadFile] = useMutation(UPLOAD_MUTATION, {
        onCompleted: data => console.log(data),
        onError: e => console.log(e)
    });
    const handleFileChange = function (event) {
        const file = event.target.files[0]
        console.log(file)
        if (file) {
            uploadFile({ variables: { file } })
        }
    }
    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange} />
        </div>
    )
}