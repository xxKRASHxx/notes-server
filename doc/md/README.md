# Documentation for Notes

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *https://notes-1ed6c.web.app*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*NotesApi* | [**createNote**](Apis/NotesApi.md#createnote) | **PUT** /notes | Creates a new note
*NotesApi* | [**getNoteByID**](Apis/NotesApi.md#getnotebyid) | **GET** /notes/{id} | Get particular note
*NotesApi* | [**notesList**](Apis/NotesApi.md#noteslist) | **GET** /notes | List of all notes
*UserApi* | [**currentUser**](Apis/UserApi.md#currentuser) | **GET** /users/me | Returns current user
*UserApi* | [**signin**](Apis/UserApi.md#signin) | **POST** /users/signin | Authenticates user and returns JWT token.
*UserApi* | [**signup**](Apis/UserApi.md#signup) | **POST** /users/signup | Creates a new user


<a name="documentation-for-models"></a>
## Documentation for Models

 - [Credentials](./Models/Credentials.md)
 - [Error](./Models/Error.md)
 - [Jwt](./Models/Jwt.md)
 - [Note](./Models/Note.md)
 - [User](./Models/User.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="bearerAuth"></a>
### bearerAuth

- **Type**: HTTP basic authentication

