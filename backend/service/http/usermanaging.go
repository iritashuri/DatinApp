package http

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"datingApp/service/user"

	"github.com/julienschmidt/httprouter"
	"golang.org/x/crypto/bcrypt"
)

type UserReq struct {
	Email    string `json:"email"`
	FName    string `json:"fName"`
	LName    string `json:"lName"`
	Password string `json:"password"`
}

const (
	headerValueContentTypeJSON = "application/json"
	headerKeyContentType       = "Content-Type"
)

type UserService interface {
	CreateUser(ctx context.Context, user user.User) (string, error)
	//FindUser(ctx context.Context, id string) (user.User, error)
	//GetAllUsers(ctx context.Context) ([]user.User, error)
}

func AddUserRoutes(router *httprouter.Router, s UserService) {
	//getUserHandler := makeFindUserHandler(s)
	//getAllUsersHandler := makeGetAllUsersHandler(s)
	createUserHandler := makeCreateUserHandler(s)
	someFunc := someFunc(s)

	//router.Handle(http.MethodGet, "/users", getAllUsersHandler)
	//router.Handle(http.MethodGet, "/users/:id", getUserHandler)
	router.Handle(http.MethodPost, "/users", createUserHandler)
	router.Handle(http.MethodGet, "/users", someFunc)
}

func makeCreateUserHandler(s UserService) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		userReq := &UserReq{}

		err := json.NewDecoder(r.Body).Decode(userReq)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userReq.Password), 8)

		user := user.User{
			FName:    userReq.FName,
			LName:    userReq.LName,
			Email:    userReq.Email,
			Password: string(hashedPassword),
		}

		id, err := s.CreateUser(r.Context(), user)

		if err != nil {
			w.WriteHeader(1000)
			return
		}

		encodeJSON(w, formatUserIdResponse(id))
	}
}

func someFunc(s UserService) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
		fmt.Println("in get")
	}
}

//
//func makeFindUserHandler(s UserService) httprouter.Handle {
//	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
//		// decode http request
//		id := params.ByName("id")
//
//		// trigger BL
//		dck, err := s.FindUser(r.Context(), id)
//		if err != nil {
//			// TODO(oren): encode error (don't panic)
//			// Think how can you know if need to present 404 or 500
//			panic("makeAddDuckHandler paniced! aaaa " + err.Error())
//		}
//
//		// encode to http response
//		formatted := formatGetUserResponse(dck)
//		encodeJSON(w, formatted)
//	}
//}

//func makeGetAllUsersHandler(s UserService) httprouter.Handle {
//	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
//		ducks, err := s.GetAllUsers(r.Context())
//		if err != nil {
//			// TODO(oren): encode error (don't panic)
//			panic("makeAddDuckHandler paniced! aaaa " + err.Error())
//		}
//
//		formatted := formatGetAllUsersResponse(ducks)
//		encodeJSON(w, formatted)
//	}
//}

func encodeJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set(headerKeyContentType, headerValueContentTypeJSON)

	jsonBytes, err := json.Marshal(data)
	if err != nil {
		// TODO: encode error, don't panic
		panic("aaaaa " + err.Error())
	}
	_, err = w.Write(jsonBytes)
	if err != nil {
		// TODO: log error
	}

	w.WriteHeader(http.StatusTeapot)
}
