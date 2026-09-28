;; Onchain Guestbook
;; Stores short messages permanently on the Stacks blockchain.

(define-data-var message-count uint u0)

(define-map messages
  { id: uint }
  { sender: principal, message: (string-ascii 160) }
)

(define-read-only (get-message-count)
  (ok (var-get message-count))
)

(define-read-only (get-message (id uint))
  (map-get? messages { id: id })
)

(define-public (sign-guestbook (message (string-ascii 160)))
  (let ((id (+ (var-get message-count) u1)))
    (map-set messages
      { id: id }
      { sender: tx-sender, message: message }
    )
    (var-set message-count id)
    (ok id)
  )
)
