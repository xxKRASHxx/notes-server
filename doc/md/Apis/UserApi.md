# UserApi

All URIs are relative to *https://notes-1ed6c.web.app*

Method | HTTP request | Description
------------- | ------------- | -------------
[**currentUser**](UserApi.md#currentUser) | **GET** /users/me | 
[**signin**](UserApi.md#signin) | **POST** /users/signin | 
[**signup**](UserApi.md#signup) | **POST** /users/signup | 


<a name="currentUser"></a>
# **currentUser**
> user currentUser()



    Returns current user

### Parameters
This endpoint does not need any parameter.

### Return type

[**user**](../Models/user.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="signin"></a>
# **signin**
> user signin(Credentials)



    Authenticates user and returns JWT token.

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Credentials** | [**Credentials**](../Models/Credentials.md)|  |

### Return type

[**user**](../Models/user.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="signup"></a>
# **signup**
> user signup(UNKNOWN\_BASE\_TYPE)



    Creates a new user

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **UNKNOWN\_BASE\_TYPE** | [**UNKNOWN_BASE_TYPE**](../Models/UNKNOWN_BASE_TYPE.md)|  |

### Return type

[**user**](../Models/user.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

