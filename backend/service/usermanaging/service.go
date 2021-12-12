package usermanaging

import (
	"context"
	"datingApp/service/user"
	"fmt"

	"golang.org/x/crypto/bcrypt"

	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/nextid"
)

type UserRepo interface {
	CreateUser(ctx context.Context, user user.User) error
	FindUserByEmail(ctx context.Context, user user.User) (user.User, error)
	IsIdExist(ctx context.Context, user user.User) (bool, error)
}

type service struct {
	userRepo UserRepo
}

func NewService(userRepo UserRepo) *service {
	return &service{
		userRepo: userRepo,
	}
}

func (s *service) CreateUser(ctx context.Context, user user.User) (id string, err error) {
	user.ID = nextid.GenerateID(12)

	if err := s.userRepo.CreateUser(ctx, user); err != nil {
		return "", fmt.Errorf("CreateDuck: %w", err)
	}
	return user.ID, nil
}

func (s *service) LogIn(ctx context.Context, user user.User) (string, error) {
	userRes, err := s.userRepo.FindUserByEmail(ctx, user)
	if err != nil {
		return "", fmt.Errorf("CreateUser: %w", err)
	}

	isEqual := bcrypt.CompareHashAndPassword([]byte(userRes.Password), []byte(user.Password))
	if isEqual != nil {
		return "", fmt.Errorf("password is incorrect: %w", err)
	}

	return userRes.ID, nil
}
