# NotesApi

All URIs are relative to *https://notes-1ed6c.web.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNote**](NotesApi.md#createNote) | **PUT** /notes | 
[**getNoteByID**](NotesApi.md#getNoteByID) | **GET** /notes/{id} | 
[**notesList**](NotesApi.md#notesList) | **GET** /notes | 


<a name="createNote"></a>
# **createNote**
> note createNote(Note)



    Creates a new note

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Note** | [**Note**](../Models/Note.md)| Optional description in *Markdown* |

### Return type

[**note**](../Models/note.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="getNoteByID"></a>
# **getNoteByID**
> note getNoteByID(id)



    Get particular note

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Integer**|  | [default to null]

### Return type

[**note**](../Models/note.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="notesList"></a>
# **notesList**
> List notesList()



    List of all notes

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/note.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

