package http

import (
	"encoding/json"
	"fmt"
	"net/http"

	"datingApp/service/user"

	"github.com/julienschmidt/httprouter"
)

type UserCredReq struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
}


func AddSignInRout(router *httprouter.Router, s UserService) {
	findUserHandler := makeFindUserHandler(s)
	router.Handle(http.MethodPost, "/auth", findUserHandler)
}

func makeFindUserHandler(s UserService) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, params httprouter.Params) {

		UserCredReq := &UserReq{}

		err := json.NewDecoder(r.Body).Decode(UserCredReq)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		user := user.User{
			Email:     UserCredReq.Email,
			Password:  UserCredReq.Password,
		}

		fmt.Println(user.Password)
		id, err := s.LogIn(r.Context(), user)

		if err != nil {
			w.WriteHeader(1000)
			return
		}
		encodeJSON(w, formatUserIdResponse(id))
	}
}