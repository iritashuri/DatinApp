package http

import "datingApp/service/user"

func formatGetUserResponse(user user.User) map[string]interface{} {
	return map[string]interface{}{
		"user": formatUser(user),
	}
}

func formatGetAllUsersResponse(users []user.User) map[string]interface{} {
	formattedUsers := make([]map[string]interface{}, len(users))
	for i, user := range users {
		formattedUsers[i] = formatUser(user)
	}

	return map[string]interface{}{
		"users": formattedUsers,
	}
}

func formatUser(user user.User) map[string]interface{} {
	return map[string]interface{}{
		"id":       user.ID,
		"fName":    user.FirstName,
		"lName":    user.LastName,
		"email":    user.Email,
		"password": user.Password,
	}
}

func formatUserIdResponse(id string) map[string]interface{} {
	return map[string]interface{}{
		"id": id,
	}
}
