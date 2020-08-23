import React, {Component} from 'react';
class FetchUtils extends React.Component {
    static send(method, url, content_type, data, callback) {
        let request;
        if (method === 'GET') {
            request = new Request(url, {
                method: 'GET',
                headers: ({
                    'Content-Type': content_type
                })
            });
        } else if (method === 'POST') {
            request = new Request(url, {
                method: 'POST',
                headers: ({
                    'Content-Type': content_type
                }),
                body: JSON.stringify(data)
            });
        }
        fetch(request).then((response) => response.json())
            .then((jsonData) => {
                callback(jsonData);//1
            });
    }
}
module.exports = FetchUtils;