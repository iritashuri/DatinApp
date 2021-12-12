package sql

import (
	"context"
	"datingApp/service/user"
	"fmt"

	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/nextsql"
)

type UserRes struct {
	ID       string `sql:"id"`
	FName    string `sql:"first_name"`
	LName    string `sql:"last_name"`
	Email    string `sql:"email"`
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

func (r *userRepo) SignUp(ctx context.Context, user user.User) error {
	q := `INSERT INTO users (id, first_name, last_name, email, password) values (?, ?, ?, ?, ?)`

	_, err := r.db.Exec(ctx, q, user.ID, user.FName, user.LName, user.Email, user.Password)
	if err != nil {
		return fmt.Errorf("failed to exec: %w", err)
	}

	return nil
}
