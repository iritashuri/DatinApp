package sql

import (
	"context"
	"datingApp/service/user"
	"fmt"

	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/nextsql"
)

type UserRes struct {
	ID        string `sql:"ID"`
	FirstName string `sql:"first_name"`
	LastName  string `sql:"last_name"`
	Email     string `sql:"email"`
	Password string `sql:"password"`
}

type UserIdRes struct {
	ID  string    `sql:"ID"`
	Password string `sql:"password"`
}

type userRepo struct {
	db nextsql.DB
}

func NewUserRepo(db nextsql.DB) *userRepo {
	return &userRepo{
		db: db,
	}
}

func (r *userRepo) CreateUser(ctx context.Context, user user.User) error {
	q := `INSERT INTO users (id, first_name, last_name, email, password) values (?, ?, ?, ?, ?)`

	_, err := r.db.Exec(ctx, q, user.ID, user.FirstName, user.LastName, user.Email, user.Password)

	if err != nil {
		return fmt.Errorf("failed to exec: %w", err)
	}

	return nil
}

func (r *userRepo) FindUserByEmail(ctx context.Context, userRep user.User) (user.User , error) {
	q := `SELECT ID, password FROM users WHERE email = ?`

	results, err := r.db.StructQuery(ctx, UserIdRes{}, q, userRep.Email)

	if err != nil {
		return user.User{}, fmt.Errorf("failed to exec: %w", err)
	}

	if len(results) == 0 {
		return user.User{}, fmt.Errorf("email was not found")
	}

	res := results[0].(UserIdRes)

	userRes := user.User{
		ID: res.ID,
		Password: res.Password,
	}

	return  userRes, nil
}



func (r *userRepo) IsIdExist(ctx context.Context, user user.User) (bool , error) {
	q := `SELECT * FROM users WHERE ID=?`

	results, err := r.db.IsExists(ctx,q, user.Password)

	if err != nil {
		return false, fmt.Errorf("failed to exec: %w", err)
	}

	return  results, nil
}

