import sqlite3
import datetime
from sqlite3 import Error

import random

from models.nft import *
from models.follow import *


class CRUDUtils:
    def __init__(self, file_path):
        self.conn = self.create_connection(file_path)

    @staticmethod
    def create_connection(db_file):
        conn = None
        try:
            conn = sqlite3.connect(db_file, check_same_thread=False)
        except Error as e:
            print(e)
        return conn

    def create_user_table(self):
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS users (
            id integer PRIMARY KEY,
            first_name text,
            last_name text,
            nonce integer,
            public_address text
        );
        """
        try:
            cursor = self.conn.cursor()
            cursor.execute(create_table_sql)
            self.conn.commit()
        except Error as e:
            print(e)

    def add_new_user(self, public_address):
        nonce = random.randrange(1, 10000000000000)

        add_user_sql = f"""
        INSERT INTO users(nonce, public_address)
        VALUES ({nonce},'{public_address}')
        """
        try:
            cursor = self.conn.cursor()
            cursor.execute(add_user_sql)
            self.conn.commit()
        except Error as e:
            print(e)

    def get_user(self, public_address):
        user_query_sql = f"""
        SELECT first_name, last_name, nonce, public_address FROM users WHERE public_address='{public_address}' 
        """

        cursor = self.conn.cursor()
        cursor.execute(user_query_sql)
        results = cursor.fetchall()

        if len(results) == 0:
            return None
        else:
            return results[0]

    def check_user_exists(self, public_address):
        if not self.get_user(public_address):
            return False
        else:
            return True

    def update_user_nonce(self, public_address):
        updated_nonce = random.randrange(1, 10000000000000)
        update_nonce_sql = f"""
                UPDATE users SET nonce={updated_nonce} WHERE public_address='{public_address}' 
        """

        cursor = self.conn.cursor()
        cursor.execute(update_nonce_sql)
        self.conn.commit()

    def update_user_details(self, public_address, first_name, last_name):
        update_user_sql = f"""
        UPDATE users
        SET first_name='{first_name}', last_name='{last_name}'
        WHERE public_address='{public_address}' 
        """

        cursor = self.conn.cursor()
        cursor.execute(update_user_sql)
        self.conn.commit()

    def create_nft_table(self):
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS nfts (
            id integer PRIMARY KEY,
            owner text,
            contract_address text,
            token_id integer,
            name text,
            image_preview_url text ,
            image_original_url text,
            symbol text,
            added_at text
        );
        """
        try:
            cursor = self.conn.cursor()
            cursor.execute(create_table_sql)
            self.conn.commit()
        except Error as e:
            print(e)

    def add_nft_data(self, public_address, nft_data: NFT):
        timestamp = int(datetime.datetime.now().timestamp())
        add_nft_sql = f"""
        INSERT INTO nfts(owner,contract_address,token_id,name,image_preview_url,image_original_url,symbol,added_at)
        VALUES ('{public_address}','{nft_data.contract_address}',{nft_data.token_id},'{nft_data.name}','{nft_data.image_preview_url}','{nft_data.image_original_url}','{nft_data.symbol}','{timestamp}')
        """

        try:
            cursor = self.conn.cursor()
            cursor.execute(add_nft_sql)
            self.conn.commit()
        except Error as e:
            print(e)

    def check_nft_exists(self, public_address, contract_address, token_id):
        check_sql = f"""
        SELECT * from nfts WHERE owner='{public_address}' AND contract_address='{contract_address}' AND token_id={token_id} 
        """

        cursor = self.conn.cursor()
        cursor.execute(check_sql)
        results = cursor.fetchall()

        if len(results) == 0:
            return False
        else:
            return True

    def get_nfts(self, public_address):
        fetch_nfts_sql = f"""
        SELECT contract_address,token_id,name,image_preview_url,image_original_url,symbol,added_at
        FROM nfts
        WHERE owner='{public_address}' 
        """
        nfts = []

        cursor = self.conn.cursor()
        cursor.execute(fetch_nfts_sql)
        results = cursor.fetchall()

        for result in results:
            # TODO: Currently NFTs without images are not supported
            if result[3] == "None":
                continue

            nft = NFT(contract_address=result[0],
                      token_id=result[1],
                      name=result[2],
                      image_preview_url=result[3],
                      image_original_url=result[4],
                      symbol=result[5],
                      added_at=int(result[6])
                      )
            nfts.append(nft)
        return nfts

    def create_followers_table(self):
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS followers (
            id integer PRIMARY KEY,
            follower text,
            following text
        );
        """
        try:
            cursor = self.conn.cursor()
            cursor.execute(create_table_sql)
            self.conn.commit()
        except Error as e:
            print(e)

    def add_follow_request(self, follow_request: FollowRequest):
        insert_follow_request = f"""
        INSERT INTO followers(follower, following) VALUES('{follow_request.follower}','{follow_request.following}') 
        """

        try:
            cursor = self.conn.cursor()
            cursor.execute(insert_follow_request)
            self.conn.commit()
        except Error as e:
            print(e)

    def get_all_followings(self, public_address):
        select_followings_query = f"""
        SELECT following FROM followers WHERE follower='{public_address}' 
        """

        cursor = self.conn.cursor()
        cursor.execute(select_followings_query)
        results = cursor.fetchall()
        results = [result[0] for result in results]
        # Fetch only distinct followings
        return list(set(results))

    def get_all_followers(self, public_address):
        select_followers_query = f"""
        SELECT follower FROM followers WHERE following='{public_address}' 
        """
        cursor = self.conn.cursor()
        cursor.execute(select_followers_query)
        results = cursor.fetchall()
        results = [result[0] for result in results]
        # Fetch only distinct followers
        return list(set(results))
