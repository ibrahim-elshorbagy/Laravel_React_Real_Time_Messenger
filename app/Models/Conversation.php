<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function lastMessage(){
        return $this->belongsTo(Message::class, 'last_message_id');
    }

    public function user1(){
        return $this->belongsTo(User::class, 'user_id1');
    }
    public function user2(){
        return $this->belongsTo(User::class, 'user_id2');
    }

    public static function getConversationForSidebar(User $user) {
        $users = User::getUsersExceptUser($user);
        $groups = Group::getGroupForUser($user);

        return $users->map(function (User $user) {
            return $user->toConversationArray();
        })
        ->concat($groups->map(function (Group $group) {
            return $group->toConversationArray();
        }));
    }

}
