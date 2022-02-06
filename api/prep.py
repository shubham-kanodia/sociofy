from db.crud_utils import CRUDUtils


crud_utils = CRUDUtils("./data/sqlite.db")

# Create Tables
crud_utils.create_user_table()
crud_utils.create_nft_table()
crud_utils.create_followers_table()