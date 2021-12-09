package usermanaging

import (
	"context"
	"datingApp/service/user"
	"fmt"

	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/nextid"
)

type UserRepo interface {
	SignUp(ctx context.Context, user user.User) error
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

	if err := s.userRepo.SignUp(ctx, user); err != nil {
		return "", fmt.Errorf("CreateDuck: %w", err)
	}

	return user.ID, nil
}
