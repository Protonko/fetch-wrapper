FetchWrapper - is a wrapper to allow interaction with fetch.
<h2>
  Table of Contents
</h2>
<ul>
  <li>
    <a href="#installing">Installing</a>
  </li>
  <li>
    <a href="#example">Example</a>
  </li>
  <li>
    <a href="#request">Request methods</a>
  </li>
  <li>
    <a href="#response">Response method</a>
  </li>
</ul>
<h2 id="installing">Installing</h2>

```
$ npm install fetch-wrapper
```


<h2 id="example">Example</h2>
Create a basic configuration

```javascript
import FetchWrapper from 'fetch-wrapper';

const myFetch = new FetchWrapper();

myFetch.configure({
  baseURL: 'https://exampleFetchWrapper.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Create own class with the specified parameters

```javascript
class MyFetch {
  static async requsetTo() {
    const response = await myFetch.send(
        myFetch.sendRequest()
    );

    return await response.getContent();
  }
}
```

Call the method and process the result

```javascript
  MyFetch.requsetTo().then(data => console.log(data));
```

<h2 id="request">Request methods</h2>

```javascript
class MyFetch {
  static async requsetTo() {
    const response = await myFetch.send(
        myFetch.sendRequest()
            .url('/exampleUrl') // https://exampleFetchWrapper.com/exampleUrl
            .params({
              id: 14,
              userName: 'Protonko',
            }) // https://exampleFetchWrapper.com/exampleUrl?id=14&userName=Protonko    
            .method('POST') // *GET, POST, PUT, DELETE, etc.
            .body(JSON.stringify({id: 1, answer: 42})) // body data type must match "Content-Type" header
            .addHeader('name', 'value')
            .removeHeader('name')
    );
  
    return await response.getContent();
  }
}
````

<h2 id="response">Response methods</h2>
<ul>
  <li>
    <b>getContent()</b> <br>
    return response body
  </li>
  <li>
    <b>getHeaders()</b> <br>
    console.log headers
  </li>
  <li>
    <b>getStatusCode()</b> <br>
    return status code
  </li>
  <li>
    <b>getStatusText()</b> <br>
    return status text
  </li>
  <li>
    <b>getErrorCode()</b>
    return error code
  </li>
  <li>
    <b>getErrorMessage()</b> <br>
    return error message
  </li>
</ul>
