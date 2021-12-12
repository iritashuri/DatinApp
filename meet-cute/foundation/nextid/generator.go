package nextid

import (
	"math/rand"
	"strings"
	"time"

	"github.com/oklog/ulid"
)

func GenerateID(idLength int) string {
	t := time.Now().UTC()
	entropy := rand.New(rand.NewSource(t.UnixNano()))
	id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	idLengthPrefix := id[:idLength]
	return strings.ToLower(idLengthPrefix)
}
