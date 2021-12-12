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
	Email     string `json:"email"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Password  string `json:"password"`
}

const (
	headerValueContentTypeJSON = "application/json"
	headerKeyContentType       = "Content-Type"
)

type UserService interface {
	CreateUser(ctx context.Context, user user.User) (string, error)
	LogIn(ctx context.Context, user user.User) (string, error)
}

func AddUserRoutes(router *httprouter.Router, s UserService) {
	createUserHandler := makeCreateUserHandler(s)
	someFunc := someFunc(s)

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
			FirstName: userReq.FirstName,
			LastName:  userReq.LastName,
			Email:     userReq.Email,
			Password:  string(hashedPassword),
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

func encodeJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set(headerKeyContentType, headerValueContentTypeJSON)

	jsonBytes, err := json.Marshal(data)
	if err != nil {
		// TODO: encode error, don't panic
		panic("aaaaa " + err.Error())
	}
	_, err = w.Write(jsonBytes)
	if err != nil {
		w.WriteHeader(1000)
		return
	}

	w.WriteHeader(http.StatusTeapot)
}
